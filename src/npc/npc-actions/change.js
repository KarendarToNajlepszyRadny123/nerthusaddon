import {resolveUrl} from '../../utility-functions'

export function changeGameNpc(npc)
{
    if (INTERFACE === 'NI')
    {
        const callback = function (newNpc)
        {
            if (newNpc.d && newNpc.d.id === npc.id.toString())
            {
                const img = new Image()
                img.src = resolveUrl(npc.newUrl)
                newNpc.sprite = img
                Object.defineProperty(newNpc, 'sprite', {
                    get() {return img},
                    set() {}
                })

                // Run only once
                // setTimeout so that it removes itself after all NPCs are checked by API,
                // otherwise it would throw error
                setTimeout(API.removeCallbackFromEvent.bind(API, 'newNpc', callback), 0)
            }
        }
        API.addCallbackToEvent('newNpc', callback)
    }
    else
    {
        let $style = $('#nerthus-npc-changing')
        if (!$style.length)
            $style = $('<style id="nerthus-npc-changing" />').appendTo('head')

        $style.append('#npc' + npc.id + '{' +
            'background-repeat: no-repeat;' +
            'background-image: url(' + resolveUrl(npc.newUrl) + ') !important;' +
            '}')
    }
}
