import * as $ from "jquery";
import { initFormWithValidate } from "../form";

export class NewsSendForm {
  constructor(modal) {
    this.$form = $("#news-form");
    this.$modal = modal;

    if (!this.$form) {
      return false;
    }

    this.init();
  }

  init = () => {
    initFormWithValidate(this.$form);

    this.initHandlers();
  };

  initHandlers = () => {
    this.$form.on("submit", this.onSubmit);
  };

  onSubmit = async e => {
    e.preventDefault();

    let $formData = {};

    this.$form.find("input, textarea, select").each(function() {
      $formData[this.name] = $(this).val();
    });

    let data = {
      isNaked: 1,
      f_phone: $formData.news_email,
      catalogue: 1,
      cc: 44,
      sub: 38,
      posting: 1
    };

    try {
      await fetch("/netcat/add.php", {
        method: "POST",
        body: data
      });

      this.$modal.close("news-email-modal");
    } catch (e) {
      this.$modal.close("news-email-modal");
    }

  };
}
