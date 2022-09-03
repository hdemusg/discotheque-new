import { useState, useEffect } from 'react';

import { Flex } from '@twilio-paste/core/flex';
import { Box } from '@twilio-paste/core/box';
import { Card } from '@twilio-paste/core/card';
import Button from 'react-bootstrap/Button'
import { Heading } from '@twilio-paste/core/heading';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Anchor } from '@twilio-paste/core/anchor';
import { Text } from '@twilio-paste/core/text';
import { Avatar } from '@twilio-paste/core/avatar';
import { UserIcon } from '@twilio-paste/icons/esm/UserIcon';
import { Alert } from '@twilio-paste/core/alert';
import { LoadingIcon } from '@twilio-paste/icons/esm/LoadingIcon';

import StreamPlayer from './StreamPlayer';
import ManageStream from './ManageStream';

const Dashboard = ({username, setUsername, signOut}) => {
  const [streamList, setStreamList] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  const getStreamList = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/listStreams', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setStreamList(result.streamList);
      setIsLoading(false);

    } catch (error) {
      console.log(error)
      setError(`Unable to get stream list`);
    }
  }

  useEffect(() => {
    getStreamList();
  }, []);

  return (
    <Card padding='space70' width='50%'>
      <Grid gutter='space30'>
        <Column span={5}>
          <Box backgroundColor='colorBackground' padding='space70' borderRadius='borderRadius20' textAlign='center'>
            <Flex hAlignContent='center' marginBottom='space50'>
              <Avatar size='sizeIcon100' name='avatar' icon={UserIcon}/>
            </Flex>
            <Heading as='h3' variant='heading40'>Hello, {username}!</Heading>
            <Box marginBottom='space50'>
              {!isStreaming &&
                 <Button className="bg-[#0F0] p-3 m-3" onClick={() => setIsStreaming(true)}>Start a stream!</Button>
              }

              {isStreaming &&
                <Button className="bg-[#0FF] p-3 m-3" onClick={() => setIsStreaming(false)}>Join a stream!</Button>
            
              }
            </Box>
            <Button className="bg-[#F00] p-3" onClick={signOut}>Sign Out</Button>{' '}
          </Box>
        </Column>
        <Column span={7}>
          {error &&
            <Alert onDismiss={() => setError(null)} variant='error'>
              <Text as='span'>{error}</Text>
            </Alert>
          }
          {info &&
            <Alert onDismiss={() => setInfo(null)} variant='neutral'>
              <Text as='span'>{info}</Text>
            </Alert>
          }
          {info &&
            <Alert onDismiss={() => setInfo(null)} variant='neutral'>
              <Text as='span'>{info}</Text>
            </Alert>
          }
          {isStreaming &&
            <ManageStream username={username} setError={setError} setInfo={setInfo}/>
          }
    {!isStreaming &&
    <Box marginBottom='space50'>
      <Card>
        <Heading as='h3' variant='heading40'>Ongoing Streams</Heading>
        <Box marginBottom='space50'>{streamList.length} streams are live right now</Box>
        {streamList.map((streamDetails) => {
          return (
            <StreamPlayer username={username} streamDetails={streamDetails} key={streamDetails.playerStreamerId} setError={setError} setInfo={setInfo}></StreamPlayer>
          )
        })}

        <Button variant='primary' type='submit' disabled={isLoading} onClick={getStreamList}>
          <LoadingIcon decorative={false} title='Refresh button' />
          Refresh List
        </Button>

      </Card>
    </Box>
  }
        </Column>
      </Grid>
    </Card>
  );
};

export default Dashboard;