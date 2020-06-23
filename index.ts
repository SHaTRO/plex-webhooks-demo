
import * as config from 'config';
import { server, MulterFiles, PlexDispatcher } from 'plex-webhooks';
import { randomSymLink } from './lib/RandomList';

const ADVERT_DIR: string = config.get('plex.prerolls.adverts');
const ADVERT_LINK: string = config.get('plex.prerolls.advertLink');
const INTRO_DIR: string = config.get('plex.prerolls.intros');
const INTRO_LINK: string = config.get('plex.prerolls.introLink');

async function handleMediaPlayEvent(payload: any, files: MulterFiles): Promise<void> {
  console.log('Media play event occurred.');
  console.log(JSON.stringify(payload));
  if (false) {
  await randomSymLink(ADVERT_DIR, ADVERT_LINK);
  await randomSymLink(INTRO_DIR, INTRO_LINK);
  }
}
PlexDispatcher.getInstance().register('media.play', handleMediaPlayEvent);

const app = server.app();
app.listen(server.port, () => console.log(server.msg.good));

