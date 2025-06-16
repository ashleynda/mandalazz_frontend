import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    Typography,
    Box,
    Pagination,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

const filters = ['Most Recent', 'Oldest', 'Highest Rating', 'Lowest Rating'];

export default function ReviewModal({ open, onClose, reviews = [] }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle className="flex justify-between items-center">
                <p className="font-bold text-lg text-[#000000] text-center">Reviews</p>
                <IconButton onClick={onClose}>
                    <CloseIcon color='#343330' />
                </IconButton>
            </DialogTitle>

            <DialogContent className="space-y-6">
                {/* Filter Buttons */}
                <Box className="flex flex-wrap gap-3">
                    {filters.map((filter, idx) => (
                        <Button
                            key={idx}
                            variant={filter === 'Most Recent' ? 'contained' : 'outlined'}
                            //   className={`capitalize rounded-full ${
                            //     filter === 'Most Recent' ? 'bg-[#061410] text-white' : ''
                            //   }`}
                            sx={{
                                backgroundColor: filter === 'Most Recent' ? '#061410' : 'transparent',
                                color: filter === 'Most Recent' ? '#fff' : '#49454F',
                                borderColor: '#061410',
                                textTransform: 'capitalize',
                                borderRadius: '8px',
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: filter === 'Most Recent' ? '#061410' : 'rgba(6, 20, 16, 0.1)',
                                    borderColor: '#061410',
                                },
                                fontSize: '14px',
                                fontWeight: '400',
                            }}
                        >
                            {filter}
                        </Button>
                    ))}
                </Box>

                {/* Reviews List */}
                <Box className="space-y-6">
                    {reviews.map((review, index) => (
                        <Box key={index} className="">
                            <p className="font-bold text-base text-[#000000]">
                                {review.name}
                            </p>
                            <Box className="flex items-center space-x-2 text-sm text-gray-500">
                                <Box className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </Box>
                                <span className='text-xs font-medium text-[#8D8C8C]'>{review.date}</span>
                            </Box>
                            <p variant="body2" className="text-[#000000] text-sm font-normal">
                                {review.content}
                            </p>
                        </Box>
                    ))}
                </Box>

                {/* Pagination */}
                <Box className="flex justify-center pt-4">
                    <Pagination count={10} page={1} shape="rounded" color="#061410" />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
