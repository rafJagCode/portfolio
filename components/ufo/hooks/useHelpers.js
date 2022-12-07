import UfoHelper from '../helpers/UfoHelper';
import FlyingHelper from '../helpers/FlyingHelper';
import EarthHelper from '../helpers/EarthHelper';
import EngineHelper from '../helpers/EngineHelper';
import BeamHelper from '../helpers/BeamHelper';
import CowHelper from '../helpers/CowHelper';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { refsTypes } from '@/types';

const useHelpers = (ufoRef, engineRef, beamRef, position, setPosition) => {
  const earthRef = useSelector((state) => state.globalRefs[refsTypes.EARTH_REF]);

  const [ufoHelper, setUfoHelper] = useState(null);
  const [flyingHelper, setFlyingHelper] = useState(null);
  const [earthHelper, setEarthHelper] = useState(null);
  const [engineHelper, setEngineHelper] = useState(null);
  const [beamHelper, setBeamHelper] = useState(null);
  const [cowHelper, setCowHelper] = useState(null);

  useEffect(() => {
    if (!ufoRef) return;
    setUfoHelper(new UfoHelper(ufoRef, position, setPosition));
  }, [ufoRef]);

  useEffect(() => {
    if (!ufoHelper) return;
    setFlyingHelper(new FlyingHelper(ufoHelper));
  }, [ufoHelper]);

  useEffect(() => {
    if (!earthRef) return;
    setEarthHelper(new EarthHelper(earthRef));
  }, [earthRef]);

  useEffect(() => {
    if (!engineRef) return;
    setEngineHelper(new EngineHelper(engineRef));
  }, [engineRef]);

  useEffect(() => {
    if (!beamRef) return;
    setBeamHelper(new BeamHelper(beamRef));
  }, [beamRef]);

  useEffect(() => {
    setCowHelper(new CowHelper());
  }, []);

  return [ufoHelper, flyingHelper, earthHelper, engineHelper, beamHelper, cowHelper];
};

export default useHelpers;
