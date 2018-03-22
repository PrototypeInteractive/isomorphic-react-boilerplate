// import debug from 'debug';
import LRU from 'lru-cache';

const cache = LRU({
  max: 50,
  length(n) {
    if (n && n.items && n.items.length > 0) {
      return n.items.length;
    }
    else if (n && n.length > 0) {
      return n.length;
    }

    return 1;
  },
  maxAge: 1000 * 60 * 60 // TTL 1 hour
});

export default cache;
