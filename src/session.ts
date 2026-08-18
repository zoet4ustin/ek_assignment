// Mock session + user/device context, captured once per session for the wireframe.
export const SESSION_START = Date.now()
export const SESSION_ID = 'sess_' + Math.random().toString(36).slice(2, 10)

export const USER_CTX: Record<string, string | number> = {
  user_id: 'usr_5369078',
  login_count: 14,
  device: 'iPhone 15',
  os: 'iOS',
  os_version: '17.5',
  app_version: '4.2.0 (wireframe)',
  network: '5G',
  locale: 'en-IN',
  city: 'Bengaluru, IN',
  latlong: '12.9716, 77.5946',
  ip: '103.21.58.xx',
}

export const EVENT_DESC: Record<string, string> = {
  segment_switched: 'Inferred creator cohort changed; feed and tools re-personalize.',
  screen_viewed: 'A primary screen / tab became visible.',
  category_selected: 'User filtered the feed by a category.',
  share_opened: 'Share sheet opened for a deal.',
  post_shared: 'Deal shared to a channel as a ready-made post.',
  link_copied: 'Profit link copied to clipboard.',
  link_made: 'A new profit link was generated.',
  story_card_created: 'An Instagram-ready story card was generated.',
  deal_selected: 'A deal was multi-selected for bulk broadcast.',
  broadcast_sent: 'Selected deals were broadcast to a channel.',
  bulk_copied: 'All selected posts copied at once.',
  referral_sent: 'Referral invite link shared.',
  payout_requested: 'Creator requested a payout.',
  theme_changed: 'Display theme toggled.',
}

export function fmtDur(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000))
  return Math.floor(s / 60) + 'm ' + String(s % 60).padStart(2, '0') + 's'
}

export function fmtTime(t: number): string {
  return new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}
