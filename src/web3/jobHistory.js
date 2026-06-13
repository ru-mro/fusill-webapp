// Per-wallet, browser-local record of jobs created from this device.
//
// The dashboard's job list is built from on-chain accounts (listJobs). Once a
// job is finalized or cancelled the program reclaims its account, so it vanishes
// from listJobs — leaving no trace of jobs the user already paid for and ran.
// We keep a lightweight local copy so those settled jobs can still be shown.

const KEY = 'fusill:jobHistory'

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {}
  } catch {
    return {}
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // storage disabled or over quota — history is best-effort, so ignore
  }
}

/**
 * Records one or more created jobs under the owner's wallet. Entries are merged
 * by pubkey, so re-recording an existing job updates it without losing recordedAt.
 *
 * @param {string|null|undefined} owner   — wallet base58
 * @param {Array<{pubkey: string} & object>} entries
 */
export function recordJobs(owner, entries) {
  if (!owner || !entries?.length) return
  const all  = readAll()
  const mine = { ...(all[owner] ?? {}) }
  for (const e of entries) {
    if (!e?.pubkey) continue
    mine[e.pubkey] = {
      ...mine[e.pubkey],
      ...e,
      recordedAt: mine[e.pubkey]?.recordedAt ?? Date.now(),
    }
  }
  all[owner] = mine
  writeAll(all)
}

/**
 * Returns the locally recorded jobs for a wallet, newest first.
 *
 * @param {string|null|undefined} owner — wallet base58
 * @returns {Array<object>}
 */
export function getJobHistory(owner) {
  if (!owner) return []
  return Object.values(readAll()[owner] ?? {}).sort((a, b) => b.recordedAt - a.recordedAt)
}
