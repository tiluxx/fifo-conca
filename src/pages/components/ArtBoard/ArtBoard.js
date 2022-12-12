import { useState, createContext } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import _ from 'lodash'
import './style.css'
const ResponsiveReactGridLayout = WidthProvider(Responsive)

const AddItemActionContext = createContext()

const generateLayout = () => {
    return _.map(_.range(0, 25), function (item, i) {
        var y = Math.ceil(Math.random() * 4) + 1
        return {
            x: (_.random(0, 5) * 2) % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            static: Math.random() < 0.05,
        }
    })
}

function ArtBoard({
    rowHeight = 30,
    onLayoutChange = () => {},
    cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout = generateLayout,
}) {
    const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
    const [compactType, setCompactType] = useState('vertical')
    const [mounted, setMounted] = useState(false)
    const [layouts, setLayouts] = useState({ lg: initialLayout })

    const componentDidMount = () => {
        setMounted(true)
    }

    const generateDOM = () => {
        return _.map(layouts.lg, function (l, i) {
            return (
                <div key={i} className={l.static ? 'static' : ''}>
                    {l.static ? (
                        <span className="text" title="This item is static and cannot be removed or resized.">
                            Static - {l.i}
                        </span>
                    ) : (
                        <span className="text">{l.i}</span>
                    )}
                    <span
                        style={{ position: 'absolute', right: '2px', top: 0, cursor: 'pointer' }}
                        onClick={() => onRemoveItem(i)}
                    >
                        x
                    </span>
                </div>
            )
        })
    }

    const onAddItem = () => {
        setLayouts((prev) => {
            let curLg = [...prev.lg]
            curLg = curLg.concat({
                x: layouts.lg.length % (cols || 12),
                y: Infinity,
                w: 2,
                h: 2,
                i: 'new',
                static: Math.random() < 0.05,
            })
            return { lg: curLg }
        })
    }

    const onRemoveItem = (i) => {
        setLayouts((prev) => {
            console.log(i)
            let curLg = [...prev.lg]
            console.log('before: ', curLg)
            curLg = curLg.filter((el) => curLg.indexOf(el) !== i)
            console.log('after: ', curLg)
            return { lg: curLg }
        })
    }

    const onBreakpointChange = (breakpoint) => {
        setCurrentBreakpoint(breakpoint)
    }

    const onCompactTypeChange = () => {
        setCompactType((prev) => {
            return prev === 'horizontal' ? 'vertical' : prev === 'vertical' ? null : 'horizontal'
        })
    }

    const onNewLayoutChange = (layout, layouts) => {
        onLayoutChange(layout)
    }
    const onNewLayout = (layouts) => {
        setLayouts({ lg: generateLayout() })
    }

    return (
        <div>
            <div>
                Current Breakpoint: {currentBreakpoint} ({cols[currentBreakpoint]} columns)
            </div>
            <div>Compaction type: {_.capitalize(compactType) || 'No Compaction'}</div>
            <button onClick={onNewLayout}>Generate New Layout</button>
            <button onClick={onCompactTypeChange}>Change Compaction Type</button>
            <button onClick={onAddItem}>Add Item</button>
            <ResponsiveReactGridLayout
                layouts={layouts}
                onBreakpointChange={onBreakpointChange}
                onLayoutChange={onNewLayoutChange}
                // WidthProvider option
                measureBeforeMount={false}
                // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                // and set `measureBeforeMount={true}`.
                useCSSTransforms={mounted}
                compactType={compactType}
                preventCollision={!compactType}
            >
                {generateDOM()}
            </ResponsiveReactGridLayout>
        </div>
    )
}

export default ArtBoard
