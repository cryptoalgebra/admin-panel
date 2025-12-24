import { TokenSelector } from "@/components/common/TokenSelector";
import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { Currency } from "@cryptoalgebra/integral-sdk";
import { X } from "lucide-react";

interface ITokenSelectorModal {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    onSelect: (currency: Currency) => void;
    otherCurrency?: Currency | null | undefined;
    children: React.ReactNode;
}

const TokenSelectorModal = ({ isOpen, setIsOpen, onSelect, otherCurrency, children }: ITokenSelectorModal) => {
    return (
        <Credenza open={isOpen} onOpenChange={setIsOpen}>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent
                className="bg-white rounded-lg"
                onInteractOutside={() => setIsOpen(false)}
                onEscapeKeyDown={() => setIsOpen(false)}
            >
                <CredenzaHeader>
                    <CredenzaTitle>Select a token</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody>
                    <TokenSelector onSelect={onSelect} otherCurrency={otherCurrency} />
                </CredenzaBody>
                <CredenzaClose asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 h-8 w-8"
                        onClick={() => setIsOpen(false)}
                        style={{ zIndex: 999 }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CredenzaClose>
            </CredenzaContent>
        </Credenza>
    );
};

export default TokenSelectorModal;
