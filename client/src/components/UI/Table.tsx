import TitleLayout from "./TitleLayout";

interface TableProps {
    headers: string[];
    data: { [key: string]: string }[];
    iconSrc: string;
    title: string;
    rowPadding?: string;
}

const Table: React.FC<TableProps> = ({ headers, data, title, iconSrc, rowPadding="py-2" }) => {
    return (
        <TitleLayout title={title} iconSrc={iconSrc} >
            <div className="overflow-hidden rounded-md">
                <table className="w-full border-collapse rounded-md">
                    <thead>
                        <tr >
                            {headers.map((header, index) => (
                                <th key={index} className="px-6 py-1 bg-secondary text-left text-gray text-sm">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-secondary-200' : 'bg-secondary'}>
                                {headers.map((header, colIndex) => (
                                    <td key={`${rowIndex}-${colIndex}`} className={`px-6 ${rowPadding} text-white`}>
                                        {row[header] || '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </TitleLayout>
    );
};

export default Table;
