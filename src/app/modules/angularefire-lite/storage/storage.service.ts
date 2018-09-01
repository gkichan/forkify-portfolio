import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { AngularFireLiteApp } from '../core.service';
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { isPlatformBrowser } from '@angular/common';

import { storage } from 'firebase/app';


@Injectable()
export class AngularFireLiteStorage {

  private readonly storage: storage.Storage;
  private readonly browser = isPlatformBrowser(this.platformId);

  constructor(private app: AngularFireLiteApp,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.storage = app.instance().storage();
  }

  // TODO: Add Server Side Rendering Support Using The GCS REST API

  // ------------- Upload -----------------//

  upload(ref: string, file: File | Blob | Uint8Array | any, metadata?: Object | any): Observable<any> {
    if (this.browser) {
      return fromPromise(this.child(ref).put(file, metadata));
    }
  }

  uploadString(ref: string, string: string): Observable<any> {
    if (this.browser) {
      return fromPromise(this.child(ref).putString(string));
    }
  }

  // ------------- Download -----------------//

  download(ref: string): Observable<any> {
    if (this.browser) {
      return fromPromise(this.child(ref).getDownloadURL());
    }
  }


  // ------------- Delete -----------------//

  remove(ref): Observable<any> {
    if (this.browser) {
      return fromPromise(this.child(ref).delete());
    }
  }

  // ------------- Metadata -----------------//

  getMetadata(ref: string): Subject<any> {
    if (this.browser) {
      const META = new Subject();
      this.child(ref).getMetadata().then((meta) => {
        META.next(meta);
      });
      return META;
    }
  }


  updateMetadata(ref: string, metadata: Object | any): Observable<any> {
    if (this.browser) {
      return fromPromise(this.child(ref).updateMetadata(metadata));
    }
  }

  deleteMetadata(ref: string): Observable<any> {
    if (this.browser) {
      return fromPromise(this.child(ref).updateMetadata({
        customMetadata: null,
        cacheControl: null,
        contentEncoding: null,
        contentLanguage: null,
        contentType: null
      }));
    }
  }

  private child(ref) {
    return this.storage.ref().child(ref);
  }

}

