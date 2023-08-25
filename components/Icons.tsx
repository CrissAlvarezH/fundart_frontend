export function CartIcon({className = ""}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            height="48"
            viewBox="0 -960 960 960"
            width="48">
            <path d="M286.788-81Q257-81 236-102.212q-21-21.213-21-51Q215-183 236.212-204q21.213-21 51-21Q317-225 338-203.788q21 21.213 21 51Q359-123 337.788-102q-21.213 21-51 21Zm400 0Q657-81 636-102.212q-21-21.213-21-51Q615-183 636.212-204q21.213-21 51-21Q717-225 738-203.788q21 21.213 21 51Q759-123 737.788-102q-21.213 21-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.074q22.964 0 34.945 21Q841-759 829-738L694-495q-11 19-28.559 30.5Q647.881-453 627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z"/>
        </svg>
    )
}

export function UserIcon({className = ""}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            className={className}
            viewBox="0 -960 960 960"
            width="48">
            <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"/>
        </svg>
    )
}

export function PlusIcon({className = ""}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            className={className}
            viewBox="0 -960 960 960"
            width="48">
            <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/>
        </svg>
    )
}


export function MinusIcon({className = ""}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            className={className}
            viewBox="0 -960 960 960"
            width="48">
            <path d="M200-450v-60h560v60H200Z"/>
        </svg>
    )
}