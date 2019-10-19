import CommonIcon from '_c/common-icon'
import { showTitle } from '@/libs/util'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      return showTitle(item, this)
    },
    showChildren (item) {
      return item.children && item.children.length > 0
    },
    getNameOrHref (item, children0) {
      return (children0 ? item.children[0].title : item.title)
    },
    convertName(data) {
      if (typeof data === "string") {
        return data;
      }
      return JSON.stringify(data);
    }
  }
}
