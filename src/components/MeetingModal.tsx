import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import useMeetingActions from "@/hooks/useMeetingActions";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isJoiningMetting: boolean;
}

function MeetingModal({ isOpen, onClose, title, isJoiningMetting }: MeetingModalProps) {
    const [meetingUrl, setMeetingUrl] = useState("");

    const { createMeeting, joinMeeting } = useMeetingActions();

    const handleStart = () => {
        if (isJoiningMetting) {
            const meetingId = meetingUrl.split("/").pop();
            if (meetingId) joinMeeting(meetingId);
        } else {
            createMeeting();
        }
        setMeetingUrl("");
        onClose();
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    {isJoiningMetting && (
                        <Input
                            placeholder="Paste meeting link here..."
                            value={meetingUrl}
                            onChange={(e) => setMeetingUrl(e.target.value)}
                        />
                    )}
                    <div className="flex justify-end gap-3">
                        <Button variant={"outline"} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleStart} disabled={isJoiningMetting && !meetingUrl.trim()}>{isJoiningMetting ? "Join Meeting" : "Start Meeting"}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MeetingModal;