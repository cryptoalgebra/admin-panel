import { useAlgebraFactoryHasRoleOrOwner } from '@/generated';
import { useAccount } from 'wagmi';

const ADMIN_ROLE_CONSTANT =
    '0xa777c10270ee0b99d2c737c09ff865ed48064b252418bbd31d39c8b88ea12219';

const POOLS_ADMINISTRATOR_ROLE =
    '0xb73ce166ead2f8e9add217713a7989e4edfba9625f71dfd2516204bb67ad3442';

const AdminAccount = () => {
    const { address: account } = useAccount();

    const { data: isAdmin, isLoading: isLoadingAdmin } =
        useAlgebraFactoryHasRoleOrOwner({
            args: account ? [ADMIN_ROLE_CONSTANT, account] : undefined,
        });

    const { data: isPoolAdmin, isLoading: isLoadingPoolAdmin } =
        useAlgebraFactoryHasRoleOrOwner({
            args: account ? [POOLS_ADMINISTRATOR_ROLE, account] : undefined,
        });

    const isLoading = isLoadingAdmin || isLoadingPoolAdmin;

    if (!account) return;

    return (
        !isAdmin &&
        !isPoolAdmin &&
        !isLoading && (
            <div className="fixed top-0 left-0 right-0 text-white text-center bg-red-500">
                Connect admin account
            </div>
        )
    );
};

export default AdminAccount;
