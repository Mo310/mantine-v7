import React, { useState } from 'react';
import { Switch, Group, useMantineTheme } from '@mantine/core';
import { MantineDemo } from '@mantine/ds';
import { IconCheck, IconX } from '@tabler/icons-react';

const code = `
import { useState } from 'react';
import { Switch, Group, useMantineTheme } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

function Demo() {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);
  return (
    <Group position="center">
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        color="teal"
        size="md"
        label="Switch with thumb icon"
        thumbIcon={
          checked ? (
            <IconCheck style={{ width: '0.8rem', height: '0.8rem' }} color={theme.colors.teal[6]} stroke={3} />
          ) : (
            <IconX style={{ width: '0.8rem', height: '0.8rem' }} color={theme.colors.red[6]} stroke={3} />
          )
        }
      />
    </Group>
  );
}
`;

function Demo() {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);
  return (
    <Group justify="center">
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        color="teal"
        size="md"
        label="Switch with thumb icon"
        thumbIcon={
          checked ? (
            <IconCheck
              style={{ width: '0.8rem', height: '0.8rem' }}
              color={theme.colors.teal[6]}
              stroke={3}
            />
          ) : (
            <IconX
              style={{ width: '0.8rem', height: '0.8rem' }}
              color={theme.colors.red[6]}
              stroke={3}
            />
          )
        }
      />
    </Group>
  );
}

export const thumbIcon: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
