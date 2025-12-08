export enum AppFeatureModule {
    FarmingModule = "FarmingModule",
}

/* configure enabled modules here */
export const enabledModules: Record<AppFeatureModule, boolean> = {
    [AppFeatureModule.FarmingModule]: true,
};
