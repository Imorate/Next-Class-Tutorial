import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingCart } from "lucide-react";

export default function ProductNotFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>محصولی یافت نشد</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
