import {v4 as uuidv4} from 'uuid';

const status = {
  PROGRESS: 'PROGRESS',
  FINISEDH: 'FINISHED',
  REDACTED: 'REDACTED',
  CODE: 'CODE',
};

export const experiments = [
  {
    title: 'Dynamic AABB Node Tree for Collision Detection',
    description: '',
    status: status.CODE,
    url: 'https://ho1xz.csb.app/',
    media: [{src: '', type: 'image'}],
    _id: uuidv4(),
  },
  {
    title: 'Lissajous Curve',
    description: '',
    status: status.CODE,
    url: 'https://codepen.io/bwilytsch/full/EMKRVM',
    media: [{src: '', type: 'image'}],
    _id: uuidv4(),
  },
  {
    title: 'KBDFans.com Stock Tracker',
    description: '',
    status: null,
    url: 'https://csb-njvnq.netlify.app/',
    media: [{src: '', type: 'image'}],
    _id: uuidv4(),
  },
];

export const projects = [
  {
    title: 'Icongrid — Minimal Vector Editor',
    description: '',
    status: status.PROGRESS,
    url: '',
    media: [{src: '', type: 'image'}],
    _id: uuidv4(),
  },
  {
    title: 'VR — Oculus Venus',
    description: '',
    status: null,
    url:
      'https://www.oculus.com/experiences/quest/2464560730245504/?locale=en_US',
    media: [{src: './projects/fnatic-df.jpg', type: 'image'}],
    _id: uuidv4(),
  },
  {
    title: 'VR — Oculus Browser',
    description: '',
    status: null,
    url:
      'https://www.oculus.com/experiences/gear-vr/1257988667656584/?locale=en_GB',
    media: [{src: './projects/dash-ar.jpg', type: 'image'}],
    _id: uuidv4(),
  },
  {
    title: 'AR — Fnatic DASH Mousepad',
    description: '',
    status: null,
    url: 'https://dash-ar.fnatic.com/',
    media: [{src: './projects/dash-ar.jpg', type: 'image'}],
    _id: uuidv4(),
  },
  {
    title: 'WatchOS — The Weather Channel',
    description: '',
    status: null,
    url:
      'https://apps.apple.com/us/app/weather-the-weather-channel/id295646461#?platform=appleWatch',
    media: [{src: './projects/dash-ar.jpg', type: 'image'}],
    _id: uuidv4(),
  },
  {
    title: 'AR & VR — The Future of Work',
    description: '',
    status: status.REDACTED,
    url: '',
    media: [{src: '', type: 'image'}],
    _id: uuidv4(),
  },
];
