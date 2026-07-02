import { useReadAlgebraFactoryHasRoleOrOwner } from "@/generated";
import { useAccount } from "wagmi";

import PredictionModule from "@/modules/PredictionModule";
const { usePredictionProtocolAddress } = PredictionModule.hooks;

const ADMIN_ROLE_CONSTANT = "0xa777c10270ee0b99d2c737c09ff865ed48064b252418bbd31d39c8b88ea12219";

const POOLS_ADMINISTRATOR_ROLE = "0xb73ce166ead2f8e9add217713a7989e4edfba9625f71dfd2516204bb67ad3442";

const AdminAccount = () => {
    const { address: account } = useAccount();

    const { data: isAdmin, isLoading: isLoadingAdmin } = useReadAlgebraFactoryHasRoleOrOwner({
        args: account ? [ADMIN_ROLE_CONSTANT, account] : undefined,
    });

    const { data: isPoolAdmin, isLoading: isLoadingPoolAdmin } = useReadAlgebraFactoryHasRoleOrOwner({
        args: account ? [POOLS_ADMINISTRATOR_ROLE, account] : undefined,
    });

    const { data: predictionProtocoolAddress, isLoading: isLoadingPredictionProtocol } = usePredictionProtocolAddress();

    const isPredictionProtocol = predictionProtocoolAddress && account && predictionProtocoolAddress === account;

    const isLoading = isLoadingAdmin || isLoadingPoolAdmin || isLoadingPredictionProtocol;

    if (!account) return;

    return (
        !isAdmin &&
        !isPoolAdmin &&
        !isPredictionProtocol &&
        !isLoading && <div className="w-full text-white text-center bg-red-500">Connect admin account</div>
    );
};

export default AdminAccount;
