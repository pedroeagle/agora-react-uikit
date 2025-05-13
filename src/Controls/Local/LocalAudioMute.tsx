import React, { useContext } from 'react'
import RtcContext from '../../RtcContext'
import BtnTemplate from '../BtnTemplate'
import { LocalContext } from '../../LocalUserContext'
import PropsContext, { ToggleState } from '../../PropsContext'
import muteAudio from './muteAudio'

function LocalAudioMute() {
  const {
    styleProps,
    callbacks,
    rtcProps: { enableAudio }
  } = useContext(PropsContext)
  const { localBtnStyles } = styleProps || {}
  const { muteLocalAudio } = localBtnStyles || {}
  const { dispatch, localAudioTrack } = useContext(RtcContext)
  const local = useContext(LocalContext)
  const [isFirstRender, setIsFirstRender] = React.useState(!enableAudio)
  React.useEffect(() => {
    const mute = async () => {
      if (isFirstRender && localAudioTrack) {
        await muteAudio(local, dispatch, localAudioTrack, callbacks).then(
          () => {
            setIsFirstRender(false)
          }
        )
      }
    }
    mute()
  }, [isFirstRender, localAudioTrack, muteAudio, local, dispatch, callbacks])
  return (
    <div>
      <BtnTemplate
        style={muteLocalAudio}
        name={local.hasAudio === ToggleState.enabled ? 'mic' : 'micOff'}
        onClick={() =>
          localAudioTrack &&
          muteAudio(local, dispatch, localAudioTrack, callbacks)
        }
      />
    </div>
  )
}

export default LocalAudioMute
