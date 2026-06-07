import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { removeProduct } from '../store/productsSlice';
import { useAppDispatch } from '../store/hooks';
import { Product } from '../types/product';

const useDeleteProductModal = (products: Product[]) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteProduct = useMemo(
    () => products.find((product) => product.id === deleteId) ?? null,
    [deleteId, products]
  );

  const requestDelete = (id: string) => {
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(removeProduct(deleteId));
    }

    setDeleteId(null);
  };

  return {
    deleteId,
    deleteProduct,
    requestDelete,
    closeDeleteModal,
    confirmDelete,
    confirmText: deleteProduct ? t('modal.deleteProductPrompt', { name: deleteProduct.name }) : undefined,
  };
};

export default useDeleteProductModal;