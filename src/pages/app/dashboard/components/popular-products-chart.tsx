import { useQuery } from '@tanstack/react-query'
import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { GetPopularProducts } from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const COLORS = [
  colors.violet[500],
  colors.blue[500],
  colors.green[500],
  colors.pink[500],
  colors.red[500],
  colors.yellow[500],
  colors.indigo[500],
]

// const products = [
//   { name: 'pizza grande (dois sabores)', quantity: 50 },
//   { name: 'Hambúrguer', quantity: 40 },
//   { name: 'Batata frita (média)', quantity: 20 },
//   { name: 'Sushi (combo família I)', quantity: 60 },
//   { name: 'Macarrão (Monte o seu)', quantity: 40 },
//   { name: 'Pastel (grande)', quantity: 20 },
//   { name: 'Púre de macaxeira I', quantity: 40 },
// ]

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryFn: GetPopularProducts,
    queryKey: ['metrics', 'get-popular-products'],
    staleTime: 5000,
  })

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            {popularProducts && popularProducts.length > 0 && (
              <Pie
                data={popularProducts}
                dataKey="amount"
                nameKey="product"
                cx="50%"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {popularProducts[index].product.length > 12
                        ? popularProducts[index].product
                            .substring(0, 12)
                            .concat('...')
                        : popularProducts[index].product}{' '}
                      ({value})
                    </text>
                  )
                }}
              >
                {popularProducts.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                ))}
              </Pie>
            )}
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

/* <BarChart style={{ fontSize: 12 }} data={products}>
            <YAxis
              dataKey="quantity"
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              dy={16}
            ></XAxis>
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Bar dataKey="quantity" fill={colors.violet[500]} />
            {products.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </BarChart> */
