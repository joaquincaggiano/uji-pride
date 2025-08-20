import { onSnapshot } from "mobx-state-tree"
import { RootStoreModel, RootStore } from "./root-store"
import * as storage from "../../utils/storage"
import { i18n } from "../../i18n"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  try {
    // load data from storage
    data = (storage.load(ROOT_STATE_STORAGE_KEY)) || {}
    data.appData ??= {}
    data.appData.locale ??= i18n.locale

    rootStore = RootStoreModel.create(data)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    console.log("root store setup error", e)
    rootStore = RootStoreModel.create({})
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  return rootStore
}
