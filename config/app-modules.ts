export enum AppFeatureModule {
    FarmingModule = "FarmingModule",
    Ve33Module = "Ve33Module",
    PredictionModule = "PredictionModule",
}

/* configure enabled modules here */
export const enabledModules: Record<AppFeatureModule, boolean> = {
    [AppFeatureModule.FarmingModule]: true,
    [AppFeatureModule.Ve33Module]: false,
    [AppFeatureModule.PredictionModule]: false,
};
