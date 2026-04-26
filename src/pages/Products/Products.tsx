import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterBar from '../../components/OrderCard/FilterBar';
import ProductCard from '../../components/OrderCard/ProductCard';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import useDeleteProductModal from '../../hooks/useDeleteProductModal';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import useProductEntityLookups from '../../hooks/useProductEntityLookups';
import { useAppSelector } from '../../store/hooks';
import { Product } from '../../types/product';
import './Products.scss';

const Products: React.FC = () => {
	const [type, setType] = useState('');
	const [specification, setSpecification] = useState('');
	const [typeQuery, setTypeQuery] = useState('');
	const [specificationQuery, setSpecificationQuery] = useState('');
	const [searchParams] = useSearchParams();
	const products = useAppSelector((state) => state.products.items);
	const groups = useAppSelector((state) => state.groups.items);
	const orders = useAppSelector((state) => state.orders.items);
	const { deleteId, requestDelete, closeDeleteModal, confirmDelete, confirmText } = useDeleteProductModal(products);
	const { groupNames, orderNames, orderDates } = useProductEntityLookups(groups, orders);
	const debouncedTypeQuery = useDebouncedValue(typeQuery.trim().toLowerCase(), 350);
	const debouncedSpecificationQuery = useDebouncedValue(specificationQuery.trim().toLowerCase(), 350);
	const debouncedGlobalQuery = useDebouncedValue((searchParams.get('q') ?? '').trim().toLowerCase(), 350);

	const types: string[] = useMemo(
		() => Array.from(new Set(products.map((product: Product) => product.type))),
		[products]
	);
	const specifications: string[] = useMemo(
		() => Array.from(new Set(products.map((product: Product) => product.specification))),
		[products]
	);

	const filtered = useMemo(
		() => products.filter((product: Product) => {
			const searchableText = [
				product.name,
				product.serialNumber,
				product.type,
				product.specification,
				groupNames.get(product.groupId) ?? '',
				orderNames.get(product.orderId) ?? '',
			].join(' ').toLowerCase();

			return (
				(type ? product.type === type : true) &&
				(specification ? product.specification === specification : true) &&
				(debouncedTypeQuery ? product.type.toLowerCase().includes(debouncedTypeQuery) : true) &&
				(debouncedSpecificationQuery ? product.specification.toLowerCase().includes(debouncedSpecificationQuery) : true) &&
				(debouncedGlobalQuery ? searchableText.includes(debouncedGlobalQuery) : true)
			);
		}),
		[
			debouncedGlobalQuery,
			debouncedSpecificationQuery,
			debouncedTypeQuery,
			groupNames,
			orderNames,
			products,
			specification,
			type,
		]
	);

	return (
		<section className="products-page">
			<div className="products-page__header">
				<div className="products-page__title">
					<span className="products-page__title-badge">+</span>
					<span>Продукты / {filtered.length}</span>
				</div>
			</div>
			<FilterBar
				type={type}
				specification={specification}
				typeQuery={typeQuery}
				specificationQuery={specificationQuery}
				types={types}
				specifications={specifications}
				onTypeChange={setType}
				onSpecificationChange={setSpecification}
				onTypeQueryChange={setTypeQuery}
				onSpecificationQueryChange={setSpecificationQuery}
			/>
			<div className="products-page__list">
				{filtered.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						groupName={groupNames.get(product.groupId)}
						orderName={orderNames.get(product.orderId)}
						orderDate={orderDates.get(product.orderId)}
						variant="products"
						onDelete={requestDelete}
					/>
				))}
			</div>
			<ConfirmModal
				open={!!deleteId}
				onClose={closeDeleteModal}
				onConfirm={confirmDelete}
				text={confirmText}
			/>
		</section>
	);
};

export default Products;
