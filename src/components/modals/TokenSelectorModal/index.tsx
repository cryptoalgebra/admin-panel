import { TokenSelector } from "@/components/common/TokenSelector";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Currency } from "@cryptoalgebra/integral-sdk";
import { useState } from "react";

interface ITokenSelectorModal {
    onSelect: (currency: Currency) => void;
    otherCurrency?: Currency | null | undefined;
    children: React.ReactNode;
}

const TokenSelectorModal = ({ onSelect, otherCurrency, children }: ITokenSelectorModal) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (currency: Currency) => {
        onSelect(currency);
        setIsOpen(false);
    };
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
                    <TokenSelector onSelect={handleSelect} otherCurrency={otherCurrency} />
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default TokenSelectorModal;
