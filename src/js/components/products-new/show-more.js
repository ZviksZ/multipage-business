import * as $ from "jquery";

export class ShowMore {
  constructor() {
    this.$btn = $("#show-more");

    if (this.$btn.length === 0) return false;

    this.init();
  }

  init = () => {
    if (this.$btn.closest(".text").find(".hide-mobile").length !== 0) {
      this.$btn.on("click", this.showMore);
    } else {
      this.$btn.addClass("hide-mobile");
    }
  };

  showMore = () => {
    this.$btn
      .closest(".text")
      .find(".hide-mobile")
      .removeClass("hide-mobile");
    this.$btn.remove();
  };
}
