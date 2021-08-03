import { Component } from '@angular/core';
import numberChecker from './number-checker'

enum CheckMethod {
  isPrime = 'isPrime',
  isFibonacci = 'isFibonacci'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numberInput = 0;
  methodOptions = Object.values(CheckMethod);
  selectedMethod = CheckMethod.isPrime;
  result = false;

  handleNumberChanged() {
    setTimeout(() => {
      if (typeof (this.numberInput) !== 'number') {
        this.numberInput = 0;
      }
      if (this.numberInput < 0) {
        this.numberInput = 0;
      }
      this.numberInput = Math.round(this.numberInput);
      this.updateResult();
    })
  }

  updateResult() {
    switch (this.selectedMethod) {
      case CheckMethod.isPrime:
        this.result = numberChecker.isPrime(this.numberInput);
        return;

      case CheckMethod.isFibonacci:
        this.result = numberChecker.isFibonacci(this.numberInput);
        return;
    }
  }
}
