import React from 'react';
import { Table, Text, Highlight, rem } from '@mantine/core';
import { DocsSection } from '@/components/DocsSection';
import docgenData from '@/.docgen/docgen.json';
import classes from './PropsTable.module.css';

export interface DocgenProp {
  defaultValue: {
    value: string;
  };
  description: string;
  name: string;
  required: boolean;
  type: {
    name: string;
  };
}

export interface Docgen {
  description: string;
  displayName: string;
  props: Record<string, DocgenProp>;
}

const PROPS_DATA: Record<string, Docgen> = docgenData as any;

interface PropsTableProps {
  component: string;
  query: string;
}

export function PropsTable({ component, query }: PropsTableProps) {
  if (!PROPS_DATA[component]) {
    return null;
  }

  const rows = Object.keys(PROPS_DATA[component].props)
    .filter((propKey) =>
      PROPS_DATA[component].props[propKey].name.toLowerCase().includes(query.toLowerCase().trim())
    )
    .map((propKey) => {
      const prop = PROPS_DATA[component].props[propKey];

      return (
        <Table.Tr key={propKey}>
          <Table.Td style={{ whiteSpace: 'nowrap' }}>
            <Highlight highlight={query} component="span" fz="sm">
              {prop.name}
            </Highlight>

            {prop.required && (
              <Text component="sup" color="red" fz="xs">
                {' '}
                *
              </Text>
            )}
          </Table.Td>

          <Table.Td>
            <Text className={classes.type} fz="xs" fw={500}>
              {prop.type.name}
            </Text>
          </Table.Td>
          <Table.Td>
            <Text
              className={classes.description}
              component="span"
              fz="sm"
              dangerouslySetInnerHTML={{ __html: prop.description }}
            />
          </Table.Td>
        </Table.Tr>
      );
    });

  if (rows.length === 0) {
    return (
      <Text color="dimmed" mb="xl">
        Nothing found
      </Text>
    );
  }

  return (
    <DocsSection>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: rem(500) }}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Description</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    </DocsSection>
  );
}
