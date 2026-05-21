import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import AddProductModal from '../../components/Groups/AddProductModal';
import type { AddProductFormPayload } from '../../components/Groups/AddProductModal.types';
import GroupCard from '../../components/Groups/GroupCard';
import ProductCard from '../../components/OrderCard/ProductCard';
import useDeleteProductModal from '../../hooks/useDeleteProductModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addProduct } from '../../store/productsSlice';
import './Groups.scss';

const Groups: React.FC = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const groups = useAppSelector((state) => state.groups.items);
	const products = useAppSelector((state) => state.products.items);
	const orders = useAppSelector((state) => state.orders.items);
	const [selectedGroupId, setSelectedGroupId] = useState<string | null>(groups[0]?.id ?? null);
	const hasInitializedSelectionRef = useRef(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const { deleteId, requestDelete, closeDeleteModal, confirmDelete, confirmText } = useDeleteProductModal(products);
	const requestedGroupId = searchParams.get('groupId');

	useEffect(() => {
		if (!hasInitializedSelectionRef.current && !requestedGroupId && !selectedGroupId && groups.length) {
			hasInitializedSelectionRef.current = true;
			setSelectedGroupId(groups[0].id);
		}
	}, [groups, requestedGroupId, selectedGroupId]);

	useEffect(() => {
		if (!requestedGroupId) return;
		const hasGroup = groups.some((group) => group.id === requestedGroupId);
		if (hasGroup) {
			hasInitializedSelectionRef.current = true;
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
								<ProductCard key={product.id} product={product} variant="groups" onDelete={requestDelete} />
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
				onClose={closeDeleteModal}
				onConfirm={confirmDelete}
				text={confirmText}
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
