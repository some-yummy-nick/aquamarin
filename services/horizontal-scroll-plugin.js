import Scrollbar from 'smooth-scrollbar'

class HorizontalScrollPlugin extends Scrollbar.ScrollbarPlugin {
    static pluginName = 'horizontalScroll'

    transformDelta(delta, fromEvent) {
        if (!/wheel/.test(fromEvent.type)) {
            return delta
        }
       
        // if (this.scrollbar.offset.x >= this.scrollbar.limit.x) {
        //     this.scrollbar.setPosition(0, this.scrollbar.limit.x);
        //     return
        // }
        
        const { x, y } = delta
        
        return {
            y: 0,
            x: Math.abs(x) > Math.abs(y) ? x : y
        }
    }
}

export { HorizontalScrollPlugin }
