// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};

// Write API like Structure to deliver data

// About route
// Work route

const status = {
  PROGRESS: 'PROGRESS',
  FINISEDH: 'FINISHED',
  REDACTED: 'REDACTED',
};

export const projects = [
  {
    title: 'Icongrid: Minimal Vector Editor',
    description: '',
    status: status.PROGRESS,
    url: '',
    media: [{ src: '', type: 'image' }],
  },
  {
    title: 'VR — Oculus Venus',
    description: '',
    status: null,
    url: '',
    media: [{ src: '', type: 'image' }],
  },
  {
    title: 'VR — Oculus Browser',
    description: '',
    status: null,
    url: '',
    media: [{ src: '', type: 'image' }],
  },
  {
    title: 'AR — Fnatic DASH Mousepad',
    description: '',
    status: null,
    url: '',
    media: [{ src: '', type: 'image' }],
  },
  {
    title: 'WatchOS — The Weather Channel',
    description: '',
    status: null,
    url: '',
    media: [{ src: '', type: 'image' }],
  },
  {
    title: 'AR & VR — The Future of Work',
    description: '',
    status: status.REDACTED,
    url: '',
    media: [{ src: '', type: 'image' }],
  },
];
