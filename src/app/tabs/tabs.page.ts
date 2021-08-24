import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [ConfigService]
})
export class TabsPage implements OnInit {

  public categories: Array<any> = [];

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.categories = this.configService.getCategories();
  }

}
