import { HttpClient } from "@angular/common/http";
import {baseApiConfig} from "./api-config";
import { inject } from "@angular/core";

export class ApiService {
  protected readonly http = inject(HttpClient);
  protected readonly apiConfig = baseApiConfig;

  constructor() {
  }

  protected get root(): string {
    return this.apiConfig.root;
  }
}
