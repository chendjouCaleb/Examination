import {Component, Input} from "@angular/core";
import {Test} from "examination/entities";
import {TestHttpClient} from "examination/models/http";
import {AlertEmitter} from "examination/controls";
import {MsfModalRef} from "fabric-docs";


@Component({
  templateUrl: 'publish-score.html',
  selector: 'app-publish-score'
})
export class PublishScore {
  @Input()
  test: Test;

  constructor(private _httpClient: TestHttpClient,
              private _alertEmitter: AlertEmitter,
              private _modalRef: MsfModalRef<PublishScore>) {
  }


  async changePublishState() {
    await this._httpClient.published(this.test);
    if (this.test.isPublished) {
      this.test.publicationDate = null;
      this._alertEmitter.info(`Les notes de l'épreuve sont maintenant cachées!`);
    } else {
      this.test.publicationDate = new Date();
      this._alertEmitter.success(`Les notes de l'épreuve sont maintenant publiées!`);
    }

    this._modalRef.close();

  }
}
