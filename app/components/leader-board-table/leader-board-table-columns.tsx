import { createColumnHelper } from "@tanstack/react-table";
import { Player } from '../../types/leader-board.types';
import { RankCell, PlayerCell, CountryCell, MoneyCell, ColumnHeader } from '../columns';

const columnHelper = createColumnHelper<Player>();

export const getLeaderBoardColumns = () => [
  columnHelper.accessor("rank", {
    header: () => <ColumnHeader title="Rank" />,
    cell: (props) => <RankCell row={props.row} />,
  }),

  columnHelper.accessor("details", {
    header: () => <ColumnHeader title="Player" />,
    cell: (props) => <PlayerCell row={props.row} />,
  }),

  columnHelper.accessor("details.country", {
    header: () => <ColumnHeader title="Country" />,
    cell: (props) => <CountryCell row={props.row} />,
  }),

  columnHelper.accessor("details.money", {
    header: () => <ColumnHeader title="Money" />,
    cell: (props) => <MoneyCell row={props.row} />,
  }),
];