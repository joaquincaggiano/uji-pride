import { Instance, SnapshotOut, types } from "mobx-state-tree"


export const AppDataModel = types
  .model("AppData")
  .props({
    locale: types.optional(types.enumeration(["es", "ca", "en"]), "es"),
  })
  .actions((self) => ({
    setLocale: (locale: string) => {
      self.locale = locale
    }
  }))

type AppDataType = Instance<typeof AppDataModel>
export interface AppData extends AppDataType {}
type AppDataSnapshotType = SnapshotOut<typeof AppDataModel>
export interface AppDataSnapshot extends AppDataSnapshotType {}
export const createAppDataDefaultModel = () => types.optional(AppDataModel, {})
