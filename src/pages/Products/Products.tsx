import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterBar from '../../components/OrderCard/FilterBar';
import ProductCard from '../../components/OrderCard/ProductCard';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeProduct } from '../../store/productsSlice';
import { Group } from '../../types/group';
import { Order } from '../../types/order';
import { Product } from '../../types/product';
import './Products.scss';

const Products: React.FC = () => {
	const [type, setType] = useState('');
	const [specification, setSpecification] = useState('');
	const [typeQuery, setTypeQuery] = useState('');
	const [specificationQuery, setSpecificationQuery] = useState('');
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const products = useAppSelector((state) => state.products.items);
	const groups = useAppSelector((state) => state.groups.items);
	const orders = useAppSelector((state) => state.orders.items);
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

	const groupNames = useMemo(
		() => new Map(groups.map((group: Group) => [group.id, group.name])),
		[groups]
	);
	const orderNames = useMemo(
		() => new Map(orders.map((order: Order) => [order.id, order.name])),
		[orders]
	);
	const orderDates = useMemo(
		() => new Map(orders.map((order: Order) => [order.id, order.date])),
		[orders]
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

	const handleDelete = (id: string) => {
		setDeleteId(id);
	};

	const handleConfirmDelete = () => {
		if (deleteId) dispatch(removeProduct(deleteId));
		setDeleteId(null);
	};

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
						onDelete={handleDelete}
					/>
				))}
			</div>
			<ConfirmModal
				open={!!deleteId}
				onClose={() => setDeleteId(null)}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
};

export default Products;
