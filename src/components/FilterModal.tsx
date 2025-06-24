import React from 'react';

interface Props {
	onFilter: (filter: string) => void;
	onClose: () => void;
}
export const FilterModal: React.FC<Props> = () => {
	return <div>FilterModal</div>;
};
