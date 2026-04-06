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
