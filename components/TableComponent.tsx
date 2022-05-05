import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { FC } from 'react'
import { Notice, Todo } from '../types/types'

type TableProps = {
  todos: Todo[]
  notices: Notice[]
}

export const Tables: FC<TableProps> = ({ todos, notices }) => {
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>The list of todos</TableCaption>
          <Thead>
            <Tr>
              <Th>Add Date</Th>
              <Th>Todos</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos?.map((todo) => (
              <Tr key={todo.id}>
                <Td>{todo.created_at}</Td>
                <Td>{todo.title}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>The list of notices</TableCaption>
          <Thead>
            <Tr>
              <Th>Add Date</Th>
              <Th>Notices</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notices?.map((notice) => (
              <Tr key={notice.id}>
                <Td>{notice.created_at}</Td>
                <Td>{notice.content}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
