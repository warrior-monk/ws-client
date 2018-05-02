import { Component } from '@angular/core';
import {MyWebSocket} from './angular2-websocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter: string = 'not known';
  ws: MyWebSocket;
  constructor() {
    this.ws = new MyWebSocket("ws://localhost:8088/counter");
  }

  subscribe($event) {
    console.log("trying to subscribe to ws");
    this.ws = new MyWebSocket("ws://localhost:8088/counter");
    this.ws.send("Hello");
    this.ws.getDataStream().subscribe(
      res => {
        var count = JSON.parse(res.data).value;
        console.log('Got: ' + count);
        this.counter = count;
      },
      function(e) { console.log('Error: ' + e.message); },
      function() { console.log('Completed'); }
    );
  }
}
