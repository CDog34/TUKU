import {rootComponent} from 'main';

const handleScroll = (e) => {
  const target = e.target;
  const scrollBottom = target.scrollHeight - target.offsetHeight - target.scrollTop;
  rootComponent.$emit('v-scroll', scrollBottom);
};

export default {
  bind: function (el) {
    el.addEventListener('scroll', handleScroll);
  },
  unbind: function (el) {
    el.removeEventListener('scroll', handleScroll);
  }
};
