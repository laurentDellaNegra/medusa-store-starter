import type { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/util/money"
import { css } from "styled-system/css"

interface AccountOverviewProps {
  customer: HttpTypes.StoreCustomer
  orders: HttpTypes.StoreOrder[] | null
  countryCode: string
}

export default function AccountOverview({
  customer,
  orders,
  countryCode,
}: AccountOverviewProps) {
  return (
    <div className={css({ display: "flex", flexDir: "column", gap: "8" })}>
      {/* Greeting */}
      <div>
        <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>
          Hello {customer.first_name}
        </h1>
        <p className={css({ fontSize: "sm", color: "fg.muted", mt: "1" })}>
          Welcome to your account dashboard.
        </p>
      </div>

      {/* Quick links */}
      <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", md: "1fr 1fr 1fr" }, gap: "4" })}>
        <QuickLink href={`/${countryCode}/account/profile`} title="Profile" description="Edit your name, email, and phone" />
        <QuickLink href={`/${countryCode}/account/addresses`} title="Addresses" description="Manage shipping addresses" />
        <QuickLink href={`/${countryCode}/account/orders`} title="Orders" description="View your order history" />
      </div>

      {/* Recent orders */}
      <div>
        <h2 className={css({ fontSize: "lg", fontWeight: "semibold", mb: "4" })}>
          Recent Orders
        </h2>
        {!orders || orders.length === 0 ? (
          <p className={css({ fontSize: "sm", color: "fg.muted" })}>
            You haven't placed any orders yet.
          </p>
        ) : (
          <div className={css({ display: "flex", flexDir: "column", gap: "3" })}>
            {orders.slice(0, 5).map((order) => (
              <a
                key={order.id}
                href={`/${countryCode}/account/orders/${order.id}`}
                className={css({
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: "4",
                  borderWidth: "1px",
                  borderColor: "border.default",
                  borderRadius: "md",
                  textDecoration: "none",
                  color: "fg.default",
                  _hover: { bg: "bg.muted" },
                })}
              >
                <div>
                  <p className={css({ fontSize: "sm", fontWeight: "medium" })}>
                    Order #{order.display_id}
                  </p>
                  <p className={css({ fontSize: "xs", color: "fg.muted" })}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className={css({ textAlign: "right" })}>
                  <p className={css({ fontSize: "sm", fontWeight: "medium" })}>
                    {convertToLocale({
                      amount: order.total ?? 0,
                      currency_code: order.currency_code,
                    })}
                  </p>
                  <p className={css({ fontSize: "xs", color: "fg.muted" })}>
                    {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <a
      href={href}
      className={css({
        p: "4",
        borderWidth: "1px",
        borderColor: "border.default",
        borderRadius: "md",
        textDecoration: "none",
        color: "fg.default",
        _hover: { bg: "bg.muted" },
      })}
    >
      <p className={css({ fontSize: "sm", fontWeight: "semibold" })}>{title}</p>
      <p className={css({ fontSize: "xs", color: "fg.muted", mt: "1" })}>{description}</p>
    </a>
  )
}
