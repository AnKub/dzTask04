import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import AddProductModal from '../../components/Groups/AddProductModal';
import GroupCard from '../../components/Groups/GroupCard';
import ProductCard from '../../components/OrderCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addProduct, removeProduct } from '../../store/productsSlice';
import './Groups.scss';

type AddProductFormPayload = {
	name: string;
	serialNumber: string;
	status: 'свободен' | 'в ремонте';
	condition: 'новый' | 'б/у';
	type: string;
	specification: string;
	priceUAH: number;
	priceUSD: number;
	warrantyFrom: string;
	warrantyTo: string;
};

const Groups: React.FC = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const groups = useAppSelector((state) => state.groups.items);
	const products = useAppSelector((state) => state.products.items);
	const orders = useAppSelector((state) => state.orders.items);
	const [selectedGroupId, setSelectedGroupId] = useState<string | null>(groups[0]?.id ?? null);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const requestedGroupId = searchParams.get('groupId');

	useEffect(() => {
		if (!requestedGroupId) return;
		const hasGroup = groups.some((group) => group.id === requestedGroupId);
		if (hasGroup) {
			setSelectedGroupId(requestedGroupId);
		}
	}, [groups, requestedGroupId]);

	const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? null;

	const groupProducts = useMemo(
		() => products.filter((product) => product.groupId === selectedGroupId),
		[products, selectedGroupId]
	);
	const groupCounts = useMemo(
		() => products.reduce((counts, product) => {
			counts.set(product.groupId, (counts.get(product.groupId) ?? 0) + 1);
			return counts;
		}, new Map<string, number>()),
		[products]
	);

	const deleteProduct = useMemo(
		() => products.find((product) => product.id === deleteId) ?? null,
		[deleteId, products]
	);

	const handleConfirmDelete = () => {
		if (deleteId) {
			dispatch(removeProduct(deleteId));
			setDeleteId(null);
		}
	};

	const handleAddProduct = (payload: AddProductFormPayload) => {
		if (!selectedGroupId) return;
		const fallbackOrderId = groupProducts[0]?.orderId ?? orders[0]?.id ?? 'order-1';
		dispatch(addProduct({ ...payload, groupId: selectedGroupId, orderId: fallbackOrderId }));
		setIsAddModalOpen(false);
	};

	return (
		<section className="groups-page">
			<div className="groups-page__sidebar">
				<div className="groups-page__title">				
					<span>Групи / {groups.length}</span>
				</div>
				<div className="groups-page__list">
					{groups.map((group) => (
						<GroupCard
							key={group.id}
							group={group}
							active={group.id === selectedGroupId}
							productsCount={groupCounts.get(group.id) ?? 0}
							onClick={() => setSelectedGroupId(group.id)}
						/>
					))}
				</div>
			</div>

			<div className="groups-page__content">
				{selectedGroup ? (
					<div className="groups-page__panel">
						<div className="groups-page__panel-header">
							<div className="groups-page__panel-meta">
								<div className="groups-page__panel-title">{selectedGroup.name}</div>
								<div className="text-muted">Товаров в группе: {groupProducts.length}</div>
								<button className="groups-page__add-trigger" type="button" onClick={() => setIsAddModalOpen(true)}>
									<span className="groups-page__add-trigger-icon">+</span>
									<span>Добавить продукт</span>
								</button>
							</div>
							<div className="groups-page__panel-actions">
								<button className="groups-page__close" type="button" aria-label="Закрити список" onClick={() => setSelectedGroupId(null)}>
									×
								</button>
							</div>
						</div>

						{groupProducts.length ? (
							groupProducts.map((product) => (
								<ProductCard key={product.id} product={product} variant="groups" onDelete={setDeleteId} />
							))
						) : (
							<div className="groups-page__empty">В этой группе еще нет товаров.</div>
						)}
					</div>
				) : (
					<div className="groups-page__panel groups-page__empty">Выберите группу слева, чтобы просмотреть товары.</div>
				)}
			</div>

			<ConfirmModal
				open={!!deleteId}
				onClose={() => setDeleteId(null)}
				onConfirm={handleConfirmDelete}
				text={deleteProduct ? `Вы действительно хотите удалить продукт "${deleteProduct.name}"?` : undefined}
			/>
			<AddProductModal
				open={isAddModalOpen}
				groupName={selectedGroup?.name ?? 'группы'}
				onClose={() => setIsAddModalOpen(false)}
				onSubmit={handleAddProduct}
			/>
		</section>
	);
};

export default Groups;
