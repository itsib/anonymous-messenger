import { Subscription } from 'rxjs';

export class SubStore {

  private $subscriptions: Subscription;

  constructor() {
    this.$subscriptions = new Subscription();
  }

  /**
   * Delete all subscriptions
   */
  destroy(): void {
    this.$subscriptions.unsubscribe();
  }

  /**
   * Add new subscription
   */
  set sub(subscription: Subscription) {
    this.$subscriptions.add(subscription);
  }
}
