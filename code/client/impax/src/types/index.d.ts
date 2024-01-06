type buddyStatus = {
  battery: number;
  timestamp: Date;
};

export interface Buddies extends Map<number, BuddyStatus> {
  get(buddy_id: number): BuddyStatus | undefined;
  set(buddy_id: number, status: BuddyStatus): this;
  has(buddy_id: number): boolean;
  delete(buddy_id: number): boolean;
}
