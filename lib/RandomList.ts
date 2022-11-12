
import * as path from 'path';

import * as lnf from 'lnf';
import * as fs from 'fs-extra';
const fsPromises = fs.promises;

export type FileList = string[];

export async function getFilesFromDir(dir: string, filterFunc?: (s: string) => boolean): Promise<string[]> {
  const files: (string|undefined)[] = (await fsPromises.readdir(dir)).map( (f) => path.join(dir, f) );
  const filter: (s: string) => boolean = filterFunc || function(f) { return fs.lstatSync(f).isFile(); };
  return files.filter( (s) => s && filter(s) ) as string[];
}

export async function randomFileList(dir: string, filter?: (s: string) => boolean): Promise<string[]> {
  const files: string[] = await getFilesFromDir(dir);
  const rand: string[] = [];
  const origLength = files.length;
  while (files.length) {
    let randomIndex = Math.floor(Math.random() * origLength);
    const file = files.pop();
    if (file) {
      while (rand[randomIndex]) {
        randomIndex = (randomIndex + 1) % origLength;
      }
      rand[randomIndex] = file;
    }
  }
  return rand;  
}


/**
 * Class to manage the directory path random lists.
 * To use:
 *    const randomFile = await RandomList.getInstance('/path/to/files').getFilePath();
 */
export class RandomList {

  private static dirMap: { [path: string] : RandomList } = {};

  public dirPath: string;  // path to the directory we want to randomize from
  public files: FileList;  // list of randomized files

  public static async getInstance(dirPath: string): Promise<RandomList> {
    if (this.dirMap[dirPath]) {
      return this.dirMap[dirPath];
    }
    const self = new RandomList(dirPath);
    await self.initFiles();
    this.dirMap[dirPath] = self;
    return self;
  }

  private constructor(dirPath: string) {
    this.dirPath = dirPath;
    this.files = [];
  }

  public async getFilePath(): Promise<string> {
    const file = this.files.pop();
    if (this.files.length < 1) {
      await this.initFiles();
    }
    if (!file) {
      throw new Error('failed to get a random file');
    }
    return file;
  }

  private async initFiles(): Promise<void> {
    this.files = await randomFileList(this.dirPath);
  }
}

export async function randomSymLink(dirPath: string, linkPath: string): Promise<void> {
  const srcFile = await (await RandomList.getInstance(dirPath)).getFilePath();
  if (fs.lstatSync(linkPath).isSymbolicLink()) {
    return lnf.sync(srcFile, linkPath);   // link linkPath to srcFile
  }
  return;
}

