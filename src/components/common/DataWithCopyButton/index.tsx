import CopyButton from '../CopyButton';

const DataWithCopyButton = ({ data }: { data: string }) => (
    <div className="flex items-center">
        <span className="mr-2">{data}</span>
        <CopyButton data={data} />
    </div>
);

export default DataWithCopyButton;
