import {getLeaderboard} from "../utils/localstorage-leaderboard";
import {formatDate, mapToOrdinalSuffix} from "../utils/number-utils";
import NavButtonLeft from "../components/shared/NavButtonLeft";

export function Component() {
    const leaderboardData = getLeaderboard()

    return (
        <div className="w-screen h-screen bg-neutral-900 text-white bg-home-background bg-bottom bg-cover overflow-clip">
            <div className='flex flex-col font-PressStart2P h-[71dvh] overflow-y-auto scrollbar'>
                <NavButtonLeft text='MAIN MENU' to='/'/>
                <h1 className='py-12 mx-auto text-3xl'>Leaderboard</h1>

                <table className='mx-auto text-right w-[90dvw] md:w-[60dvw]'>
                    <thead className='text-sm'>
                    <tr>
                        <th>RANK</th>
                        <th>NAME</th>
                        <th>DATE</th>
                        <th>SCORE</th>
                    </tr>
                    </thead>

                    <tbody className='text-xs'>
                    { leaderboardData
                        .sort((entry1, entry2) => entry2.points - entry1.points)
                        .map(({ timestamp, points}, index) => (
                        <tr key={timestamp}>
                            <td className='ordinal'>{ mapToOrdinalSuffix(index + 1) }</td>
                            <td>name</td>
                            <td>{ formatDate(timestamp) }</td>
                            <td>{ points }</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}