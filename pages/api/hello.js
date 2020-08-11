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
    url: 'https://codesandbox.io/s/dynamic-aabb-binary-tree-collision-ho1xz',
    media: [
      {
        src: './production/experiments/webp/aabb-node-tree.webp',
        type: 'image/webp',
      },
      {
        src: './production/experiments/jpg/aabb-node-tree.jpg',
        type: 'image/jpg',
      },
    ],
    _id: uuidv4(),
  },
  {
    title: 'Lissajous Curve',
    description: '',
    status: status.CODE,
    url: 'https://codepen.io/bwilytsch/full/EMKRVM',
    media: [
      {src: './production/experiments/webp/curves.webp', type: 'image/webp'},
      {src: './production/experiments/jpg/curves.jpg', type: 'image/jpg'},
    ],
    _id: uuidv4(),
  },
  {
    title: 'KBDFans.com Stock Tracker',
    description: '',
    status: null,
    url: 'https://csb-njvnq.netlify.app/',
    media: [
      {src: './production/experiments/webp/kbdfans.webp', type: 'image/webp'},
      {src: './production/experiments/jpg/kbdfans.jpg', type: 'image/jpg'},
    ],
    _id: uuidv4(),
  },
];

export const projects = [
  {
    title: 'Icongrid — Minimal Vector Editor',
    description: '',
    status: status.PROGRESS,
    url: '',
    media: [
      {src: './production/projects/webp/icongrid.webp', type: 'image/webp'},
      {src: './production/projects/jpg/icongrid.jpg', type: 'image/jpg'},
    ],
    _id: uuidv4(),
  },
  {
    title: 'Website — Fnatic x Dwarf Factory',
    description: '',
    status: null,
    url: 'https://keycaps.fnatic.com',
    media: [
      {src: './production/projects/webp/fnatic-df.webp', type: 'image/webp'},
      {src: './production/projects/jpg/fnatic-df.jpg', type: 'image/jpg'},
    ],
    _id: uuidv4(),
  },
  {
    title: 'VR — Oculus Browser',
    description: '',
    status: null,
    url:
      'https://www.oculus.com/experiences/gear-vr/1257988667656584/?locale=en_GB',
    media: [
      {
        src: './production/projects/webp/oculus-browser.webp',
        type: 'image/webp',
      },
      {src: './production/projects/jpg/oculus-browser.jpg', type: 'imag/jpge'},
    ],
    _id: uuidv4(),
  },
  {
    title: 'AR — Fnatic DASH Mousepad',
    description: '',
    status: null,
    url: 'https://dash-ar.fnatic.com/',
    media: [
      {src: './production/projects/webp/dash-ar.webp', type: 'image/webp'},
      {src: './production/projects/jpg/dash-ar.jpg', type: 'image/jpg'},
    ],
    _id: uuidv4(),
  },
  {
    title: 'WatchOS — The Weather Channel',
    description: '',
    status: null,
    url:
      'https://apps.apple.com/us/app/weather-the-weather-channel/id295646461#?platform=appleWatch',
    media: [
      {
        src: './production/projects/webp/the-weather-channel.webp',
        type: 'image/webp',
      },
      {
        src: './production/projects/jpg/the-weather-channel.jpg',
        type: 'image/jpg',
      },
    ],
    _id: uuidv4(),
  },
  {
    title: 'AR & VR — The Future of Work',
    description: '',
    status: status.REDACTED,
    url: '',
    media: [
      {src: '', type: 'image/webp'},
      {src: '', type: 'image/jpg'},
    ],
    _id: uuidv4(),
  },
];
